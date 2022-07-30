import React from "react";
import { IUser } from "../../Redux/Slices/userSlice";

type props = {
  user: IUser;
};

const Account = ({ user }: props) => {
  return (
    <div className="ml-auto">
      <img
        className="w-[50px] h-[50px] cursor-pointer"
        src={`data:${user.avatar.contentType};utf8,${encodeURIComponent(
          user.avatar.data
        )}`}
        alt={user.firstName + " " + user.lastName}
      ></img>
    </div>
  );
};

export default Account;
