import { IUserData, IUserMetaData } from "@/src/@types/common";
import { apiServer } from "@/src/utils/fetch/api-server";

export interface IUserResponse {
  data: IUserData;
  meta: IUserMetaData;
}

const normalizeUser = (response: IUserResponse): IUserResponse => {
  return response as IUserResponse;
};

export const getUserServer = async () => {
  try {
    return normalizeUser(await apiServer.get('renter/auth').json<IUserResponse>());
  } catch {
    return null;
  }
};
