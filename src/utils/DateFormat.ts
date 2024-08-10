import moment from "moment";

export const dateToString = (dateString: string): string => {
  return moment(new Date(dateString)).format("DD.MM.YYYY HH:mm");
};

export const now = (): string => {
  return moment(Date.now()).format("DD.MM.YYYY HH:mm")
}
