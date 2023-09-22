import { auth, db } from "@/firebase";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const index = () => {
  const [seachaPram, setSeachParam] = useSearchParams();
  const [hasSubmission, setHasSubmission] = useState(false);
  const [submission, setSubmission] = useState<string | null>(null);

  const problemId = seachaPram.get("id");
  const getSubmissions = async () => {
    let q = query(
      collection(db, "submissions"),
      where("userId", "==", auth.currentUser?.uid),
      where("problemId", "==", problemId)
    );
    const userDoc = await getDoc(
      doc(
        db,
        "problems",
        problemId || "",
        "submissions",
        auth.currentUser?.uid || ""
      )
    );
    console.log(userDoc);
    if (!userDoc.exists()) {
      setHasSubmission(false);
    } else {
      setHasSubmission(true);
      setSubmission(userDoc.id);
    }
    useEffect(() => {
      getSubmissions();
    }, [problemId]);
  };

  return (
    <section className="w-full h-full items-center justify-center flex flex-col min-h-screen bg-zinc-700">
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="gap-2 w-80  h-[350px] bg-white p-2 py-2  flex justify-center items-center flex-col rounded-sm border-b-8 border-transparent hover:border-primary hover:shadow-xl hover:drop-shadow-lg transition-all">
          <h1>userId</h1>
        </div>
        <div className="gap-2 w-80  h-[350px] p-2 py-2 bg-white flex justify-center items-center flex-col rounded-sm border-b-8 border-transparent hover:border-primary hover:shadow-xl hover:drop-shadow-lg transition-all">
          <h1>userId</h1>
        </div>
        <div className="gap-2 w-80  h-[350px] p-2 py-2 bg-white flex justify-center items-center flex-col rounded-sm border-b-8 border-transparent hover:border-primary hover:shadow-xl hover:drop-shadow-lg transition-all">
          <h1>userId</h1>
        </div>
      </div>
    </section>
  );
};
