import { verifyUser } from "../auth/verifyuser";
export default defineEventHandler(async (event) => {
  try {
    await verifyUser(event);
    return true;
  } catch (err) {
    return false;
  }
});
