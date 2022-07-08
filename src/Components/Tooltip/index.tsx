import { AiOutlineInfoCircle } from "react-icons/ai";

type Props = {
    id: string;
    toolTipText: string;
};

function ToolTip({ id, toolTipText }: Props): JSX.Element {
    return (
        <p
            id={`${id}`}
            className='bg-gray-800 text-white p-2 rounded-md flex items-center gap-3 w-full'
            aria-hidden='false'
            tabIndex={0}
            aria-live='assertive'
        >
            <AiOutlineInfoCircle className='fill-white text-lg'></AiOutlineInfoCircle>
            <span className='text-left w-3/4'>{toolTipText}</span>
        </p>
    );
}

export default ToolTip;
