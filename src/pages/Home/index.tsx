import React from "react";
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
import { ExpandIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
const Home = () => {
  const navigate = useNavigate();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="flex flex-col justify-start p-6 items-center bg-zinc-100">
      <h1 className="font-black text-blue-700 text-4xl mb-4">tutr</h1>
      <div className="flex flex-row justify-center items-start w-full max-w-screen-lg gap-6">
        <section className="grid grid-cols-1 gap-10 justify-center items-center justify-items-center">
          <article>
            <Card className="max-w-md flex flex-col justify-center text-center items-center w-full hover:shadow-md">
              <CardHeader>
                <CardTitle>Problem 207</CardTitle>
                <CardDescription>
                  <p>
                    Start with this design and transform it into a functional
                    project using HTML, CSS, and JavaScript. If you want to go
                    the extra mile, expand upon it, and integrate your unique
                    touch by adding animations and interactivity. Prioritize
                    creativity over pixel-perfect accuracy and showcase your
                    developer ingenuity. The most creative projects will be
                    showcased on our featured page and on top of your profile
                    page.
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full relative bg-zinc-50">
                <img
                  src="https://cdn.dribbble.com/userupload/9784896/file/original-f8678b8b84f26775f12d69fec4e94792.png?resize=1200x901"
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
                      src="https://cdn.dribbble.com/userupload/9784896/file/original-f8678b8b84f26775f12d69fec4e94792.png?resize=1200x901"
                      className="w-full aspect-square object-contain"
                    ></img>
                  </DialogContent>
                </Dialog>
              </CardContent>
              <CardFooter className="flex flex-col justify-between w-full gap-2 mt-6">
                <Button
                  className="w-full"
                  onClick={() => {
                    navigate("/editor");
                  }}
                >
                  Start Solving
                </Button>
                <Button className="w-full">View Submissions</Button>
              </CardFooter>
            </Card>
          </article>
          <article>
            <Card className="max-w-md flex flex-col justify-center text-center items-center w-full hover:shadow-md">
              <CardHeader>
                <CardTitle>Problem 207</CardTitle>
                <CardDescription>
                  <p>
                    Start with this design and transform it into a functional
                    project using HTML, CSS, and JavaScript. If you want to go
                    the extra mile, expand upon it, and integrate your unique
                    touch by adding animations and interactivity. Prioritize
                    creativity over pixel-perfect accuracy and showcase your
                    developer ingenuity. The most creative projects will be
                    showcased on our featured page and on top of your profile
                    page.
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full relative bg-zinc-50">
                <img
                  src="https://cdn.dribbble.com/userupload/9784896/file/original-f8678b8b84f26775f12d69fec4e94792.png?resize=1200x901"
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
                      src="https://cdn.dribbble.com/userupload/9784896/file/original-f8678b8b84f26775f12d69fec4e94792.png?resize=1200x901"
                      className="w-full aspect-square object-contain"
                    ></img>
                  </DialogContent>
                </Dialog>
              </CardContent>
              <CardFooter className="flex flex-col justify-between w-full gap-2 mt-6">
                <Button
                  className="w-full"
                  onClick={() => {
                    navigate("/editor");
                  }}
                >
                  Start Solving
                </Button>
                <Button className="w-full">View Submissions</Button>
              </CardFooter>
            </Card>
          </article>
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
