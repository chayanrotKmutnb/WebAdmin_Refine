import { ChakraProvider } from "@chakra-ui/react";
import {
  AuthPage,
  ErrorComponent,
  RefineThemes,
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/chakra-ui";
import {
  AuthProvider,
  Authenticated,
  Refine
} from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { AppIcon } from "./components/app-icon";
import { PostEdit, PostList, PostShow } from "./pages";
import { TripList, TripShow } from "./pages/trips";

const authCredentials = {
  email: "AdminTripTour1@email.com",
  password: "@dminTripTour123",
};

const App: React.FC = () => {
  const authProvider: AuthProvider = {
    login: async ({ providerName, email }) => {
      if (providerName === "google") {
        window.location.href = "https://accounts.google.com/o/oauth2/v2/auth";
        return {
          success: true,
        };
      }

      if (providerName === "github") {
        window.location.href = "https://github.com/login/oauth/authorize";
        return {
          success: true,
        };
      }

      if (email === authCredentials.email) {
        localStorage.setItem("email", email);
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    },
    register: async (params) => {
      if (params.email === authCredentials.email && params.password) {
        localStorage.setItem("email", params.email);
        return {
          success: true,
          redirectTo: "/",
        };
      }
      return {
        success: false,
        error: {
          message: "Register failed",
          name: "Invalid email or password",
        },
      };
    },
    updatePassword: async (params) => {
      if (params.password === authCredentials.password) {
        //we can update password here
        return {
          success: true,
        };
      }
      return {
        success: false,
        error: {
          message: "Update password failed",
          name: "Invalid password",
        },
      };
    },
    forgotPassword: async (params) => {
      if (params.email === authCredentials.email) {
        //we can send email with reset password link here
        return {
          success: true,
        };
      }
      return {
        success: false,
        error: {
          message: "Forgot password failed",
          name: "Invalid email",
        },
      };
    },
    logout: async () => {
      localStorage.removeItem("email");
      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return { error };
    },
    check: async () =>
      localStorage.getItem("email")
        ? {
            authenticated: true,
          }
        : {
            authenticated: false,
            error: {
              message: "Check failed",
              name: "Not authenticated",
            },
            logout: true,
            redirectTo: "/login",
          },
    getPermissions: async () => ["admin"],
    getIdentity: async () => ({
      id: 1,
      name: "AdminTripTour1",
      avatar:
        "././Firebase.png",
    }),
  };

  return (
    <BrowserRouter>
      <ChakraProvider theme={RefineThemes.Orange}>
        <Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          authProvider={authProvider}
          routerProvider={routerProvider}
          notificationProvider={useNotificationProvider()}
          resources={[
            {
              name: "posts",
              list: PostList,
              show: PostShow,
              edit: PostEdit,
              options: { label: "Users" },
            },
            {
              name: "trips",
              list: TripList,
              show: TripShow,
              options: { label: "Trips" },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-routes"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <ThemedLayoutV2
                    Title={({ collapsed }) => (
                      <ThemedTitleV2
                        collapsed={collapsed}
                        text="TripTour_WebAdmin"
                        icon={<AppIcon />}
                      />
                    )}
                  >
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route index element={<NavigateToResource resource="posts" />} />

              <Route path="/posts">
                <Route index element={<PostList />} />

                <Route path="/posts/edit/:id" element={<PostEdit />} />
                <Route path="/posts/show/:userId" element={<PostShow />} />
              </Route>

              <Route path="/trips">
                <Route index element={<TripList />} />

                <Route path="/trips/show/:userId" element={<TripShow />} />
              </Route>
            </Route>

            <Route
              element={
                <Authenticated key="auth-pages" fallback={<Outlet />}>
                  <NavigateToResource resource="posts" />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    formProps={{
                      defaultValues: {
                        ...authCredentials,
                      },
                    }}
                    providers={[
                      {
                        name: "google",
                        label: "Sign in with Google",
                        icon: <IconBrandGoogle />,
                      },
                      {
                        name: "github",
                        label: "Sign in with GitHub",
                        icon: <IconBrandGithub />,
                      },
                    ]}
                  />
                }
              />
              <Route
                path="/register"
                element={
                  <AuthPage
                    type="register"
                    providers={[
                      {
                        name: "google",
                        label: "Sign in with Google",
                        icon: <IconBrandGoogle />,
                      },
                      {
                        name: "github",
                        label: "Sign in with GitHub",
                        icon: <IconBrandGithub />,
                      },
                    ]}
                  />
                }
              />
              <Route
                path="/forgot-password"
                element={<AuthPage type="forgotPassword" />}
              />
              <Route
                path="/update-password"
                element={<AuthPage type="updatePassword" />}
              />
            </Route>

            <Route
              element={
                <Authenticated key="catch-all">
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>

          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
