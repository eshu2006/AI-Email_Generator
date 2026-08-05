import { useState } from "react";

function EmailForm({
    onGenerate,
    loading
}) {

    const [form, setForm] = useState({

        recipient: "",

        purpose: "",

        tone: "Professional",

        length: "Medium"

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async () => {

        try {

            await onGenerate(form);

            // Optional: Clear the form after generating
            setForm({
                recipient: "",
                purpose: "",
                tone: "Professional",
                length: "Medium"
            });

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8">

            <h2 className="text-3xl font-bold text-white mb-8">

                Generate Email

            </h2>

            <input

                name="recipient"

                placeholder="Recipient"

                value={form.recipient}

                onChange={handleChange}

                className="w-full p-4 rounded-xl bg-slate-800 text-white mb-5"

            />

            <textarea

                name="purpose"

                placeholder="Purpose"

                rows="5"

                value={form.purpose}

                onChange={handleChange}

                className="w-full p-4 rounded-xl bg-slate-800 text-white mb-5"

            />

            <div className="grid grid-cols-2 gap-5">

                <select

                    name="tone"

                    value={form.tone}

                    onChange={handleChange}

                    className="p-4 rounded-xl bg-slate-800 text-white"

                >

                    <option>Professional</option>

                    <option>Friendly</option>

                    <option>Formal</option>

                </select>

                <select

                    name="length"

                    value={form.length}

                    onChange={handleChange}

                    className="p-4 rounded-xl bg-slate-800 text-white"

                >

                    <option>Short</option>

                    <option>Medium</option>

                    <option>Long</option>

                </select>

            </div>

            <button

                onClick={handleSubmit}

                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 rounded-xl p-4 text-white font-bold"

            >

                {

                    loading ?

                    "Generating..."

                    :

                    "🚀 Generate Email"

                }

            </button>

        </div>

    );

}

export default EmailForm;