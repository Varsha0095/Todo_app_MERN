import EditIcon from "./icons/EditIcon";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

export default function EditTodo({ title, id, handleUpdate }) {
  const [updatedTitle, setUpdatedTitle] = useState(title);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <EditIcon className="iconHover" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <DialogTrigger asChild>
          <form className="flex flex-col gap-2" action={handleUpdate}>
            <input type="hidden" value={id} name="id" />
            <Label htmlFor="title">Previous Todo</Label>
            <Input
              id="title"
              name="title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="col-span-3"
            />
            <DialogFooter>
              <Button>Save changes</Button>
            </DialogFooter>
          </form>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
}

// const EditTodo = () => {
//   return (
//     <div>
//       <EditIcon className="iconHover" />
//     </div>
//   )
// }

// export default EditTodo
