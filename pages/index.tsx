import type { NextPage } from "next";
import React, { useState } from "react";
import { URL } from "url";
import { Editor, Footer, Header, Preview } from "../components";

const Home: NextPage = () => {
  const [source, setSource] = useState<URL>();

  return (
    <div className="px-20 min-h-screen flex flex-col justify-between bg-orange-500 dark:bg-gray-600">
      <Header />
      <main className="flex justify-center items-center">
        <div className="w-2/3 p-5 border mr-5">
          {source ? <Preview source={source} /> : <div>Preview</div>}
        </div>

        <div className="w-96 p-5 border">
          <Editor setSource={setSource} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
