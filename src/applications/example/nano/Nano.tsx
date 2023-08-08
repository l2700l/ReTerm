import React, { useRef, useState } from "react";
import styles from "./Nano.module.scss";
import { FS } from "../../../fs/fs";
import { TermAppComponent } from "../../../interfaces/TermApp";

const Nano: React.FC<
  TermAppComponent & { prevData?: string; path?: string }
> = ({ closeApp, prevData, path }) => {
  const [data, setData] = useState(prevData || "");
  const [filepath, setFilepath] = useState(path || "");
  const modified: boolean =
    (!prevData && data !== "") || (prevData && data !== prevData) || false;
  const divRef = useRef<HTMLDivElement>(null);

  const [buttonsMode, setButtonsMode] = useState<"global" | "write" | "exit">(
    "global"
  );
  const checkCommand = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.code) {
      case "KeyY":
        if (buttonsMode === "exit") {
          setButtonsMode("global");
        }
        break;
      case "KeyN":
        if (buttonsMode === "exit") {
          closeApp();
        }
        break;
      case "Enter":
        if (buttonsMode !== "global") {
          FS.write(filepath, data);
          if (path && filepath !== path) {
            FS.remove(path);
          }
          closeApp();
        }
    }
    if (e.ctrlKey) {
      switch (e.code) {
        case "KeyX":
          if (modified) {
            setButtonsMode("exit");
          } else {
            closeApp();
          }
          break;
        case "KeyO":
          if (buttonsMode === "global" && modified) {
            setButtonsMode("write");
          }
          break;
        case "KeyC":
          if (buttonsMode !== "global") {
            setButtonsMode("global");
          }
          break;
      }
    }
  };
  return (
    <div
      tabIndex={0}
      className={styles.nano}
      ref={divRef}
      onKeyDown={checkCommand}
    >
      <div className={styles.nano__info}>
        <div>UW PICO 5.09</div>
        <div className={styles.nano__info__name}>
          {path ? path : "New Buffer"}
        </div>
        <div className={styles.nano__info__modified}>
          {modified ? "Modified" : ""}
        </div>
      </div>
      <br />
      <textarea
        autoFocus
        className={styles.nano__textArea}
        value={data}
        disabled={buttonsMode !== "global"}
        onChange={(e) => setData(e.target.value)}
      />
      {buttonsMode === "write" && (
        <p>
          File name to write :
          <input
            autoFocus
            value={filepath}
            onChange={(e) => setFilepath(e.target.value)}
          />
        </p>
      )}
      {buttonsMode === "exit" && (
        <p>Save modified buffer (ANSWERING "No" WILL DESTROY CHANGES) ? </p>
      )}
      <div className={styles.nano__commands}>
        {buttonsMode === "global" && (
          <>
            <div>
              <span className={styles.nano__key}>^X</span> <span>Exit</span>
            </div>
            <div>
              <span className={styles.nano__key}>^O</span> <span>WriteOut</span>
            </div>
          </>
        )}
        {buttonsMode === "write" && (
          <>
            <div autoFocus>
              <span className={styles.nano__key}>^C</span> <span>Cancel</span>
              <span className={styles.nano__key}>Enter</span>
              <span>Confirm</span>
            </div>
          </>
        )}
        {buttonsMode === "exit" && (
          <>
            <div className={styles.nano__commands} autoFocus>
              <span className={styles.nano__key}>^C</span> <span>Cancel</span>
              <div className={styles.nano__commands_vertical}>
                <div className={styles.nano__commands}>
                  <span className={styles.nano__key}>Y</span> <span>Yes</span>
                </div>
                <div className={styles.nano__commands}>
                  <span className={styles.nano__key}>N</span> <span>No</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Nano;
