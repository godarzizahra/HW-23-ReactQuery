import type { Usertype } from "./usertype";

export type propsType = {
	onClose: () => void;
};
export type propsEditType = {
	onClose: () => void;
	user: Usertype;
};
