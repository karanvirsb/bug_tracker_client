import React, { useEffect, useRef, useState } from "react";
import socket from "../../API/sockets";

const ServerDown = ({ children }: any) => {
    const [isServerDown, setIsServerDown] = useState(false);
    const [count, setCount] = useState(0);
    const requestCount = useRef(0);

    useEffect(() => {
        socket.on("connect_error", function () {
            if (!isServerDown) {
                console.log(
                    "Failed to connect to server",
                    requestCount.current,
                    isServerDown
                );
                requestCount.current += 1;
                setCount(() => requestCount.current);
            }
        });
        return () => {
            socket.off("connect_error");
        };
    }, [isServerDown]);

    useEffect(() => {
        if (count >= 4) {
            setIsServerDown(true);
            setCount(0);
            requestCount.current = 0;
        }
    }, [count]);

    useEffect(() => {
        if (isServerDown) {
            console.log("server is down");
            const interval = setInterval(() => {
                socket.emit("ping");
            }, 30000);

            socket.on("echo", () => {
                setIsServerDown(false);
                setCount(0);
                requestCount.current = 0;
                clearInterval(interval);
            });
            return () => clearInterval(interval);
        }
    }, [isServerDown]);

    return (
        <>
            {!isServerDown ? children : <ServerDownMessage></ServerDownMessage>}
        </>
    );
};

function ServerDownMessage() {
    return (
        <div className='flex flex-col justify-center items-center mt-40 gap-4'>
            <h1 className='font-semibold text-3xl text-zinc-600 w-[75%] min-w-[100px] flex justify-center items-center gap-4'>
                Hey, we are sorry seems like the{" "}
                <span className='text-black'>Server</span> is{" "}
                <span className='text-black'>Down.</span>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-10 h-10 inline'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384'
                    />
                </svg>
            </h1>

            <p className='font-semibold text-xl w-[75%] min-w-[100px] text-center'>
                Sorry for any inconvince.
            </p>
        </div>
    );
}

export default ServerDown;
