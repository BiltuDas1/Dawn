import { useEffect, useState } from "react";
import "../styles/login.scss";
import LoadingIcon from "../components/icons/loading";
import type { JobsDataResponse } from "../types/jobs";

function Login({
  callback,
  response,
}: {
  callback: (otp: string) => Promise<void>;
  response: JobsDataResponse | null;
}) {
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);

  function selectInput(box: HTMLDivElement) {
    box.classList.add("selected");
    box.classList.remove("invalid");

    if (lastElement != null && box != lastElement) {
      lastElement.classList.remove("selected");
    }

    setLastElement(box);
    document.getElementById("totp-input")?.focus();
  }

  function insertData(input: HTMLInputElement) {
    const boxes = document
      .getElementById("box-inputs")
      ?.getElementsByClassName("box") as HTMLCollectionOf<HTMLDivElement>;

    let index = 0;
    for (const num of input.value) {
      const box = boxes[index];
      box.innerText = num;
      index++;
    }

    if (index >= 1) {
      selectInput(boxes[index - 1]);
    }

    for (; index < boxes.length; index++) {
      boxes[index].innerText = "";
    }
  }

  function authenticate(submittedForm: HTMLFormElement) {
    setLoading(true);

    const formData = new FormData(submittedForm);
    const totp = formData.get("totp");
    if (totp == null) {
      return;
    }

    const submitBtn = document.getElementById("submitbtn");
    if (submitBtn == null) {
      return;
    }
    const totpInput = document.getElementById("totp-input");
    if (totpInput == null) {
      return;
    }
    submitBtn.setAttribute("disabled", "");
    totpInput.setAttribute("readonly", "");

    callback(totp.toString());
  }

  useEffect(() => {
    if (response == null) {
      return;
    }
    setLoading(false);

    const totpInput = document.getElementById(
      "totp-input",
    ) as HTMLInputElement | null;
    if (totpInput == null) {
      return;
    }
    totpInput.value = "";
    totpInput.removeAttribute("readonly");

    const boxes = document
      .getElementById("box-inputs")
      ?.getElementsByClassName("box") as HTMLCollectionOf<HTMLDivElement>;

    for (const box of boxes) {
      box.classList.remove("selected");
      box.classList.add("invalid");
      box.innerText = "";
    }

    const submitBtn = document.getElementById("submitbtn");
    if (submitBtn == null) {
      return;
    }

    submitBtn.removeAttribute("disabled");
  }, [response]);

  return (
    <>
      <div id="login">
        <div id="login-container">
          <h2>Input your PIN</h2>
          <p>Input the PIN which you see in your authenticator application</p>
          <form
            method="POST"
            onSubmit={(event) => {
              event.preventDefault();
              authenticate(event.currentTarget);
            }}
          >
            <input
              type="tel"
              id="totp-input"
              name="totp"
              maxLength={6}
              onInput={(event) => {
                insertData(event.currentTarget);
              }}
              onError={(element) => {
                console.log(element);
              }}
            />

            <div id="box-inputs">
              <div
                className="box"
                onClick={(event) => {
                  selectInput(event.currentTarget);
                }}
              />
              <div
                className="box"
                onClick={(event) => {
                  selectInput(event.currentTarget);
                }}
              />
              <div
                className="box"
                onClick={(event) => {
                  selectInput(event.currentTarget);
                }}
              />
              <div
                className="box"
                onClick={(event) => {
                  selectInput(event.currentTarget);
                }}
              />
              <div
                className="box"
                onClick={(event) => {
                  selectInput(event.currentTarget);
                }}
              />
              <div
                className="box"
                onClick={(event) => {
                  selectInput(event.currentTarget);
                }}
              />
            </div>

            <button id="submitbtn" type="submit">
              {loading ? <LoadingIcon /> : <>Login</>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
