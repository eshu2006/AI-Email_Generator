import Loading from "./Loading";
import jsPDF from "jspdf";

function EmailOutput({ email, loading }) {

    const copyEmail = () => {

        if (!email) return;

        navigator.clipboard.writeText(

            `Subject: ${email.subject}

${email.body}`

        );

        alert("✅ Email Copied Successfully!");

    };

    const downloadPDF = () => {

        if (!email) return;

        const pdf = new jsPDF();

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);

        pdf.text(email.subject, 10, 20);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);

        const lines = pdf.splitTextToSize(email.body, 180);

        pdf.text(lines, 10, 35);

        pdf.save("Generated_Email.pdf");

    };

    return (

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8">

            <h2 className="text-3xl font-bold text-white mb-6">

                Generated Email

            </h2>

            <div className="bg-slate-900 rounded-2xl p-6 min-h-[420px]">

                {

                    loading ?

                    (

                        <Loading />

                    )

                    :

                    email ?

                    (

                        <>

                            <h3 className="text-blue-400 text-2xl font-bold">

                                {email.subject}

                            </h3>

                            <hr className="my-4 border-slate-700" />

                            <pre className="text-gray-300 whitespace-pre-wrap leading-7">

                                {email.body}

                            </pre>

                            <div className="flex gap-4 mt-8">

                                <button

                                    onClick={copyEmail}

                                    className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-xl text-white font-semibold"

                                >

                                    📋 Copy

                                </button>

                                <button

                                    onClick={downloadPDF}

                                    className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl text-white font-semibold"

                                >

                                    📄 Download PDF

                                </button>

                            </div>

                        </>

                    )

                    :

                    (

                        <div className="flex justify-center items-center h-full">

                            <p className="text-gray-400 text-lg">

                                🤖 Your AI generated email will appear here.

                            </p>

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default EmailOutput;