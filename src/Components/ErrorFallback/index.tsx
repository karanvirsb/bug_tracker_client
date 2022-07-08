const ErrorFallback = (props: { error: any; resetErrorBoundary: any }) => {
    return (
        <>
            <div>Could not fetch: {props.error.message}</div>
            <button onClick={props.resetErrorBoundary}>try again</button>
        </>
    );
};

export default ErrorFallback;
