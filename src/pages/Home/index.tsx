import React, { useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Divide, ExpandIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
const Home = () => {
  const navigate = useNavigate();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [currentProblem, setCurrentProblem] = useState<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null);
  useEffect(() => {
    const getData = async () => {
      let q = query(collection(db, "problems"), where("date", "==", date));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setCurrentProblem(doc);
      });
      if (querySnapshot.docs.length == 0) {
        setCurrentProblem(null);
      }
    };
    getData();
  }, [date]);

  return (
    <div className=" w-full h-full min-h-screen flex flex-col justify-start p-6 items-center bg-zinc-100">
      <h1 className="font-black text-blue-700 text-4xl mb-4">tutr</h1>
      <div className="flex flex-row justify-center items-start w-full max-w-screen-lg gap-6">
        <section className="grid grid-cols-1 gap-10 justify-center items-center justify-items-center">
          {currentProblem ? (
            <article>
              <Card className="max-w-md flex flex-col justify-center text-center items-center w-full hover:shadow-md">
                <CardHeader>
                  <CardTitle>{currentProblem.get("title")}</CardTitle>
                  <CardDescription>
                    <span>{currentProblem.get("description")}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full relative bg-zinc-50">
                  <img
                    src={currentProblem.get("coverURL")}
                    className="w-full aspect-square object-contain"
                  ></img>
                  <Dialog>
                    <DialogTrigger asChild className="absolute top-5 right-5">
                      <Button variant="outline" className="p-2 py-0">
                        <ExpandIcon size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl aspect-video w-full">
                      <img
                        src={currentProblem.get("coverURL")}
                        className="w-full aspect-square object-contain"
                      ></img>
                    </DialogContent>
                  </Dialog>
                </CardContent>
                <CardFooter className="flex flex-col justify-between w-full gap-2 mt-6">
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate("/editor ?id = {doc.id}");
                    }}
                  >
                    Start Solving
                  </Button>
                  <Button className="w-full">View Submissions</Button>
                </CardFooter>
              </Card>
            </article>
          ) : (
            <Card className="w-full h-full max-w-md ">
              <CardHeader>
                <CardTitle>No Problem</CardTitle>
                <CardDescription>There is no problem today.</CardDescription>
              </CardHeader>
            </Card>
          )}
        </section>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        ></Calendar>
      </div>
    </div>
  );
};

export default Home;
