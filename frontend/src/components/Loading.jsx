import { motion } from "framer-motion";

function Loading() {

    return (

        <div className="flex flex-col justify-center items-center h-80">

            <motion.div

                animate={{ rotate: 360 }}

                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear"
                }}

                className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent"

            />

            <p className="text-white mt-6 text-xl">

                🤖 Gemini is thinking...

            </p>

        </div>

    );

}

export default Loading;