import bcrypt from "bcrypt";
export const convertToHash = async (data) => {
  return await bcrypt.hash(data, 10);
};
