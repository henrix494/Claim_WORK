import { Response, Request } from "express";
import Contact, { ContactAttributes } from "../models/contact";

const deleteUser = async (req: Request, res: Response) => {
  const id = req.body.userID;
  console.log(id.userID);

  try {
    const delUser = await Contact.destroy({
      where: {
        id: id,
      },
    });
    res.status(204).send(`user delete at id ${id} name ${delUser}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default deleteUser;
