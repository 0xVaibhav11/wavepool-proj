"use client";

import * as React from "react";
import { useState } from "react";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import dayjs, { Dayjs } from "dayjs";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { a } from "./Varibale";
import styles from "./page.module.scss";

export default function Widgit(props) {
  const [EndDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  const [StartDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );

  const [network, setnetwork] = useState<number>(0);

  const { address, isConnected } = useAccount();

  const selectBtn = document.querySelector(`.${styles.selectbtn}`);
  selectBtn?.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
  });

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  function chainHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = parseInt(e.target.value);
    setnetwork(value);
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  React.useEffect(() => {}, [address]);
  return (
    <>
      <div className={styles.main1}>
        <Button
          variant="outlined"
          sx={{
            color: "rgb(29, 178, 39)",
            borderColor: "rgb(29, 178, 39)",
          }}
          onClick={handleClickOpen}
        >
          Click to make payment
        </Button>
      </div>
      <Dialog fullScreen open={open}>
        <div className={styles.main}>
          <div className={styles.carddiv}>
            {/* fist component start here  */}

            <div className={styles.compfirst}>
              <div className={styles.text1}>
                <span
                  style={{
                    backgroundColor: "rgb(29, 178, 39)",
                    width: "12px",
                    height: "5px",
                    color: "white",
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                >
                  1
                </span>
                <span style={{ marginLeft: "4px" }}>
                  Select network and token
                </span>
              </div>

              <div>
                <div>
                  {" "}
                  <div className={styles.dropdowndiv}>
                    <select
                      className={styles.dropdown}
                      onChange={(data) => {
                        chainHandler(data);
                      }}
                    >
                      <option
                        style={{
                          padding: "10px 0px 10px 0px",
                          backgroundColor: "#effaf0",
                        }}
                        className={styles.select}
                        value="10106"
                      >
                        Gorali
                      </option>
                    </select>
                    <select
                      className={styles.dropdown}
                      onChange={(data) => {
                        chainHandler(data);
                      }}
                    >
                      <option className={styles.select} value="10106">
                        fDAIx
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles.button} onClick={() => connect()}>
                Connect to Wallet
              </div>
            </div>

            <hr />

            {/*  Second component start's from here */}

            <div className={styles.componentsecond}>
              <div className={styles.text1}>
                <span
                  style={{
                    backgroundColor: "rgb(29, 178, 39)",

                    width: "24px",
                    color: "white",
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                >
                  2
                </span>

                <span
                  style={{
                    marginLeft: "4px",
                  }}
                >
                  Fill the Streaming details
                </span>
              </div>
              {isConnected && (
                <div className={styles.datepicker}>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          label="Start Date"
                          value={StartDate}
                          sx={{}}
                          onChange={(newValue) => setStartDate(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          label="End Date"
                          value={EndDate}
                          onChange={(newValue) => setEndDate(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
              )}
            </div>

            <hr />

            {/*  Third  component start's from here */}

            <div className={styles.componentthird}>
              <div className={styles.text1}>
                <span
                  style={{
                    backgroundColor: "rgb(29, 178, 39)",

                    width: "24px",
                    color: "white",
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                >
                  3
                </span>

                <span
                  style={{
                    marginLeft: "4px",
                  }}
                >
                  Complete your transection
                </span>
                {isConnected && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        color: "#a9a9ad",
                        marginTop: "1rem",
                      }}
                    >
                      <div>Sender</div>
                      <div>Receiver</div>
                    </div>
                    <div className={styles.flowdata}>
                      <div className={styles.card1}>
                        <img src="./images/orgi2.png" width={24} height={24} />
                        <span style={{ fontSize: "16px" }}>
                          {" "}
                          {address
                            ? `${address.substr(0, 8)}...${address.substr(
                                37,
                                42
                              )}`
                            : "0x0000000000"}
                        </span>
                      </div>
                      <img src={a} />
                      <div className={styles.card1}>
                        <img src="./images/orig1.png" width={24} height={24} />
                        <span style={{ fontSize: "16px" }}>
                          {" "}
                          {props.receiver
                            ? `${props.receiver.substr(
                                0,
                                8
                              )}...${props.receiver.substr(37, 42)}`
                            : "0x0000000000"}
                        </span>
                      </div>
                    </div>
                    <div className={styles.compdata}>Balance: 0 fUSDCx</div>
                    <div className={styles.button}>Start stream</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
