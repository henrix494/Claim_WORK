interface sidenavBTN {
  name: String;
  action?: String;
  link?: string;
}

export const sideNavBtn: sidenavBTN[] = [
  { name: "בית", link: "/" },
  { name: "לקוחות", action: "getALlUsers", link: "/Users" },
  { name: "הוסף", link: "/addUser" },
  { name: "הודעות", link: "/Userss" },
];
export const formFields = [
  { label: "שם משפחה", id: "LastName", name: "lastName" },
  { label: "שם", id: "name", name: "firstName" },
  { label: "רחוב", id: "street", name: "street" },
  { label: "עיר", id: "city", name: "city" },
  { label: "ארץ", id: "country", name: "country" },
  { label: "מספר", id: "phone", name: "phone" },
  { label: "מיקוד", id: "zipCode", name: "zipcode" },
  { label: "מייל", id: "email", name: "email" },
];
