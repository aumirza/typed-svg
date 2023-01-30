import type { NextPage } from "next";
import React, { useState } from "react";
import { URL } from "url";
import { Editor, Footer, Header, Preview } from "../components";

const Home: NextPage = () => {
  const [source, setSource] = useState<URL>();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-orange-500 dark:bg-gray-600">
      <Header />
      <main className="w-11/12 mx-auto my-5 gap-5 flex flex-col md:flex-row justify-center items-center">
        <div className="p-5 border">
          {source ? <Preview source={source} /> : <div>Preview</div>}
        </div>

        <div className="p-5 border">
          <Editor setSource={setSource} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
