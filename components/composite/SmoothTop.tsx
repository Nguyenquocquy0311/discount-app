import classNames from "classnames";
import { useEffect, useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";

const SmoothTop = () => {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const onSmoothToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
            <button
                className={classNames(
                    'fixed bottom-6 right-6 z-50 py-2 px-3 rounded-lg bg-blue-400 shadow-lg hover:opacity-80',
                    !showButton && 'hidden',
                )}
                onClick={onSmoothToTop}
            >
                <ArrowUpOutlined style={{ color: 'white' }}/>
            </button>
    );
}

export default SmoothTop;