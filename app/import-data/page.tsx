'use client'

import { useState } from 'react'
import Link from 'next/link'
import '../../globals.css'
import { getSignedUrl } from '../actions/getSignedUrl'

export default function ImportData() {
    const [file, setFile] = useState<File | null>(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setStatusMessage('Uploading file...');
        setLoading(true);
        console.log('file', file);

        const signedUrlResult = await getSignedUrl();
        console.log('signedUrlResult', signedUrlResult);
        // if (signedUrlResult.failure !=== undefined) {
        //     setStatusMessage('Error uploading file');
        //     setLoading(false);
        //     console.error('Error uploading file');
        //     return;
        // }
        const signedUrl = signedUrlResult.success.url

        // const formData = new FormData();
        // formData.append('file', file);
        // const response = await fetch('/api/import-data', {
        //     method: 'POST',
        //     body: formData
        // });
        // const data = await response.json();
        // console.log(data);
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement & {
            files: FileList
        }
        setFile(target.files[0]);
    }

    return (
        <div className="mx-2 mt-4">
            <h2 className="text-lg font-bold">Import Data</h2>
            <p className="text-sm text-gray-500">Import your data from Strava, Garmin, or other sources.</p>
            <div className="flex flex-col my-4 px-1 w-full justify-center">
                <p>You can import:</p>
                <ul className="list-disc pl-4">
                    <li>tktk: <s>Fitbit&copy body or activity data (.xls, .xlsx, or .csv format)</s></li>
                    <li>tktk: <s>Garmin Activity Files (.tcx, .fit or .gpx format)</s></li>
                    <li>tktk: <s>Custom Excel/CSV Data (see <Link href="/faq">How to structure custom data files</Link>)</s></li>
                </ul>
                <form onSubmit={handleSubmit}>
                    <input type="file" name="import-data" className="mt-4" onChange={handleOnChange}/>
                    <div className="mt-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
                            Import Data
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}