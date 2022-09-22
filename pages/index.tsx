import type { NextPage } from 'next'
import React, { useState } from 'react'
import { URL } from 'url'
import { Editor, Preview } from '../components'

const Home: NextPage = () => {

  const [source, setSource] = useState<URL>()

  return (
    <div className='px-20 h-screen flex justify-center items-center'>

      <div className="w-2/3 p-5 border mr-5">
        <Preview source={source} />
      </div>

      <div className="w-96 p-5 border">
        <Editor setSource={setSource} />
      </div>

    </div>
  )
}

export default Home
