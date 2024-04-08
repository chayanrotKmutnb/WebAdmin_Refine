import {
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Edit } from "@refinedev/chakra-ui";
import { useForm } from "@refinedev/react-hook-form";

export const PostEdit = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>();

  const onSubmit = data => console.log(data);

  return (
    <Edit>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.firstName}>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input id="firstName" type="text" {...register("firstName")} />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input id="lastName" type="text" {...register("lastName")} />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>

        {/* เพิ่มฟิลด์ Nick Name */}
        <FormControl isInvalid={!!errors.nickName}>
          <FormLabel htmlFor="nickName">Nick Name</FormLabel>
          <Input id="nickName" type="text" {...register("nickName")} />
          <FormErrorMessage>
            {errors.nickName && errors.nickName.message}
          </FormErrorMessage>
        </FormControl>

        {/* เพิ่มฟิลด์ Gender */}
        <FormControl isInvalid={!!errors.gender}>
          <FormLabel htmlFor="gender">Gender</FormLabel>
          <Select id="gender" {...register("gender")}>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
            <option value="other">อื่นๆ</option>
          </Select>
          <FormErrorMessage>
            {errors.gender && errors.gender.message}
          </FormErrorMessage>
        </FormControl>

        {/* เพิ่มฟิลด์ Contact Number */}
        <FormControl isInvalid={!!errors.contactNumber}>
          <FormLabel htmlFor="contactNumber">Contact Number</FormLabel>
          <Input id="contactNumber" type="text" {...register("contactNumber")} />
          <FormErrorMessage>
            {errors.contactNumber && errors.contactNumber.message}
          </FormErrorMessage>
        </FormControl>

        {/* เพิ่มฟิลด์ Profile Image URL */}
        <FormControl isInvalid={!!errors.profileImageUrl}>
          <FormLabel htmlFor="profileImageUrl">Profile Image URL</FormLabel>
          <Input id="profileImageUrl" type="text" {...register("profileImageUrl")} />
          <FormErrorMessage>
            {errors.profileImageUrl && errors.profileImageUrl.message}
          </FormErrorMessage>
        </FormControl>

      </form>
    </Edit>
  );
};
