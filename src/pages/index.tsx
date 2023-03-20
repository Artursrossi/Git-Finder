import React, { useState, useEffect, type FormEvent } from "react";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";

interface Data {
  id: number;
  name: string;
  avatar_url: string;
}

export default function Home() {
  const [profile, setProfile] = useState("");
  const [data, setData] = useState<Data[]>([]);

  async function handleFind(event: FormEvent) {
    event.preventDefault();
    AddLoadingAnimation();
    document.getElementById("UserNotFound")?.classList.add("displayNone");

    axios
      .get(`https://api.github.com/users/${profile}`)
      .then((res) => res.data)
      .then((data) => {
        setData([data]);
        RemoveLoadingAnimation();
        showUser();
      })
      .catch((err) => {
        console.log(err);
        document
          .getElementById("UserNotFound")
          ?.classList.remove("displayNone");
        RemoveLoadingAnimation();
      });
  }

  function showUser(): void {
    let formElement = document.getElementById("form");
    let userElement = document.getElementById("user");
    formElement?.classList.add("displayNone");
    userElement?.classList.remove("displayNone");
  }

  function showFinder() {}

  function AddLoadingAnimation(): void {
    const LoadingSpinnerID = document.getElementById("loadingSpinner");
    const LoadingButtonID = document.getElementById("loadingButton");

    LoadingSpinnerID?.classList.remove("displayNone");
    LoadingButtonID?.classList.add("displayNone");
  }

  function RemoveLoadingAnimation(): void {
    const LoadingSpinnerID = document.getElementById("loadingSpinner");
    const LoadingButtonID = document.getElementById("loadingButton");

    LoadingSpinnerID?.classList.add("displayNone");
    LoadingButtonID?.classList.remove("displayNone");
  }

  return (
    <>
      <Head>
        <title>Artur Schincariol Rossi</title>
        <meta
          name="description"
          content="Github Profile Finder by Artur Schincariol Rossi"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form id="form" className="main" onSubmit={handleFind}>
        <h1>GitFinder</h1>
        <p>Buscar perfil do Github</p>

        <input
          className="input"
          type="text"
          placeholder="ex: Artursrossi"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />
        <span id="UserNotFound" className="displayNone">
          Usuário não encontrado
        </span>
        <button
          id="loadingButton"
          className="button"
          type="submit"
          disabled={profile.length == 0}
        >
          Buscar Perfil
        </button>
        <div id="loadingSpinner" className="spinner displayNone" />
      </form>
      <main id="user" className="main displayNone">
        {data.map((user) => {
          return (
            <div key={user.id} className="card">
              <h1>{user.name}</h1>
              <Image
                src={user.avatar_url}
                alt={user.name}
                width={314}
                height={314}
              ></Image>
            </div>
          );
        })}
      </main>
    </>
  );
}
