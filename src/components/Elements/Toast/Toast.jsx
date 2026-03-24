import { useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./Toast.module.css";
const Toast = () => {
    const { msg, type } = useSelector((state) => state.toast);
    const icons = {
        success: "✓",
        error: "✕",
        info: "•",
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            const t = document.getElementsByClassName(style.toast)[0];
            if (t) {
                t.style.opacity = "0";
                t.style.transform = "translateX(16px)";
                t.style.transition = "all 0.2s";
            }
        }, 2500);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className={style.toast_container} id="toast-container">
            <div className={`${style.toast} ${style[type]}`}>
                <span style={{ fontWeight: "700", fontSize: "14px" }}>
                    {icons[type] || icons.info}
                </span>{" "}
                {msg}
            </div>
        </div>
    );
};
export default Toast;
