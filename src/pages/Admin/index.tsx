import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { auth, db, firestore, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const index = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    title: "",
    description: "",
    cost: "",
    date: "",
  });
  const [imgs, setImgs] = useState<FileList | null>(null);
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = useState(false);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserData((userData) => ({
      ...userData,
      [e.target.name]: e.target.value,
    }));
  };

  const saveProblem = async (url: string) => {
    if (url) {
      var id = v4();
      await setDoc(doc(firestore, "/problems/" + id), {
        ...userData,
        id: id,
        date: date,
        coverURL: url,
      });
    }
  };
  const handleSubmit = async () => {
    if (imgs != null) {
      let url = await uploadFile(imgs[0]);
      console.log(url);
      await saveProblem(url);
      setOpen(false);
    }
  };
  const uploadFile = async (file: File) => {
    console.log(file);
    const fileName = v4() + "_" + file.name;
    const res = await uploadBytes(ref(storage, `images/${fileName}`), file);
    console.log(res);
    const url = await getDownloadURL(res.ref);
    console.log(url);
    return url;
  };

  return (
    <div className="w-full  h-full min-h-screen flex items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add a new problem</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Problem</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4">
            <Label htmlFor="title" className="">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="title"
              value={userData.title}
              onChange={handleInputChange}
              className="col-span-3"
            />
            <Label htmlFor="description" className="">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="description"
              value={userData.description}
              onChange={handleInputChange}
              className="col-span-3"
            />
            <Label htmlFor="cost" className="">
              Cost
            </Label>
            <Input
              id="cost"
              name="cost"
              placeholder="cost"
              value={userData.cost}
              onChange={handleInputChange}
              type="number"
              min={0}
              max={100}
              className="col-span-3"
            />
            <Label htmlFor="date" className="">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Label htmlFor="picture">Picture</Label>
            <Input
              id="coverURL"
              type="file"
              name="coverURL"
              accept="image/*"
              onChange={(e) => {
                console.log(e.target.files);
                setImgs(e.target.files);
              }}
            />
          </form>
          <DialogFooter>
            <Button variant={"outline"} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default index;
