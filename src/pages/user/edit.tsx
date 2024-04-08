import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { Edit } from "@refinedev/chakra-ui";
import { useForm } from "@refinedev/react-hook-form";

export const PostEdit = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>();

  const onSubmit = (data: IUser) => console.log(data);

  return (
    <Edit>
      {/* ใช้ `handleSubmit` กับ `form` ใน `Edit` component */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.firstName}>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input id="firstName" type="text" {...register("firstName")} />
          <FormErrorMessage>
            {errors.firstName?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input id="lastName" type="text" {...register("lastName")} />
          <FormErrorMessage>
            {errors.lastName?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.nickName}>
          <FormLabel htmlFor="nickName">Nick Name</FormLabel>
          <Input id="nickName" type="text" {...register("nickName")} />
          <FormErrorMessage>
            {errors.nickName?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.gender}>
          <FormLabel htmlFor="gender">Gender</FormLabel>
          <Select id="gender" {...register("gender")}>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
            <option value="other">อื่นๆ</option>
          </Select>
          <FormErrorMessage>
            {errors.gender?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.contactNumber}>
          <FormLabel htmlFor="contactNumber">Contact Number</FormLabel>
          <Input id="contactNumber" type="text" {...register("contactNumber")} />
          <FormErrorMessage>
            {errors.contactNumber?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.profileImageUrl}>
          <FormLabel htmlFor="profileImageUrl">Profile Image URL</FormLabel>
          <Input id="profileImageUrl" type="text" {...register("profileImageUrl")} />
          <FormErrorIcon>
            {errors.profileImageUrl?.message}
            </FormErrorIcon>
        </FormControl>
      </form>
    </Edit>
  );
};
