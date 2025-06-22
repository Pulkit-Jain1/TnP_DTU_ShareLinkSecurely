import Topbar from "@/components/Topbar/Topbar";
import { Student } from "@/utils/types/student";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Import sorting icons

type SearchCriteria = "Name" | "Email" | "Roll Number";
// Define a type for our sortable columns for better type-safety
type SortableKey = "fullName" | "email" | "roll_no";

const SharePage: React.FC = () => {
    const router = useRouter();
    const { token } = router.query;

    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>("Email");

    // --- START: NEW STATE FOR SORTING ---
// --- START: NEW STATE FOR SORTING ---
const [sortBy, setSortBy] = useState<SortableKey | null>("roll_no");
const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
// --- END: NEW STATE FOR SORTING ---
    // --- END: NEW STATE FOR SORTING ---

    useEffect(() => {
        // Data fetching logic remains the same
        const fetchStudentData = async () => {
            if (!token) return;
            setLoading(true);
            try {
                const response = await fetch(`https://tnp-recruitment-challenge.manitvig.live/share?shareToken=${token}`);
                const data = await response.json();
                if (response.ok) setStudents(data);
                else throw new Error(data.message || "Failed to fetch data.");
            } catch (error: any) {
                toast.error(error.message);
                setStudents([]);
            } finally {
                setLoading(false);
            }
        };
        fetchStudentData();
    }, [token]);

    // --- START: COMBINED FILTERING AND SORTING LOGIC ---
    const processedStudents = useMemo(() => {
        // 1. Start with the original list of students
        let processed = [...students];

        // 2. Apply filtering based on search query
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            processed = processed.filter(student => {
                switch (searchCriteria) {
                    case "Name":
                        const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
                        return fullName.includes(lowercasedQuery);
                    case "Roll Number":
                        return student.roll_no.toLowerCase().includes(lowercasedQuery);
                    case "Email":
                    default:
                        return student.email.toLowerCase().includes(lowercasedQuery);
                }
            });
        }

        // 3. Apply sorting
        if (sortBy) {
            processed.sort((a, b) => {
                let valA: string, valB: string;
                if (sortBy === 'fullName') {
                    valA = `${a.first_name} ${a.last_name}`;
                    valB = `${b.first_name} ${b.last_name}`;
                } else {
                    valA = a[sortBy];
                    valB = b[sortBy];
                }

                if (sortDirection === 'asc') {
                    return valA.localeCompare(valB);
                } else {
                    return valB.localeCompare(valA);
                }
            });
        }

        return processed;
    }, [students, searchQuery, searchCriteria, sortBy, sortDirection]);
    // --- END: COMBINED FILTERING AND SORTING LOGIC ---

    // --- START: NEW FUNCTION TO HANDLE SORTING ---
    const handleSort = (key: SortableKey) => {
        if (sortBy === key) {
            // If already sorting by this key, toggle direction
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // If sorting by a new key, set it and default to ascending
            setSortBy(key);
            setSortDirection('asc');
        }
    };
    // --- END: NEW FUNCTION TO HANDLE SORTING ---

    // Helper component for table headers to reduce repetition
    const SortableHeader: React.FC<{
        label: string;
        sortKey: SortableKey;
    }> = ({ label, sortKey }) => (
        <th scope="col" className="px-6 py-3">
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort(sortKey)}
            >
                {label}
                {sortBy === sortKey && (
                    <span className="text-brand-orange">
                        {sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
                    </span>
                )}
            </div>
        </th>
    );

    return (
        <main className=' min-h-screen'>
            <Topbar />
            <div className="max-w-6xl mx-auto p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">Shared Student Data</h1>
                <p className="text-gray-400 mb-6">Click on column headers to sort the data.</p>

                <div className="mb-4 flex flex-wrap items-center gap-4">
                    <select
                        value={searchCriteria}
                        onChange={(e) => setSearchCriteria(e.target.value as SearchCriteria)}
                        className="p-2 rounded-md bg-dark-layer-1 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    >
                        <option value="Name">Name</option>
                        <option value="Email">Email</option>
                        <option value="Roll Number">Roll Number</option>
                    </select>

                    <input 
                        type="text"
                        placeholder={`Search by ${searchCriteria}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow p-2 rounded-md bg-dark-layer-1 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                </div>

                <div className="relative overflow-x-auto shadow-md rounded-lg">
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-xs text-gray-400 uppercase bg-dark-layer-1">
                            <tr>
                                <SortableHeader label="Full Name" sortKey="fullName" />
                                <SortableHeader label="Email" sortKey="email" />
                                <SortableHeader label="Roll No" sortKey="roll_no" />
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={3} className="text-center p-4">Loading student data...</td></tr>
                            ) : processedStudents.length > 0 ? (
                                processedStudents.map((student) => (
                                    <tr key={student.roll_no} className="bg-dark-layer-1 border-b border-gray-700 hover:bg-dark-fill-3">
                                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                            {`${student.first_name} ${student.last_name}`}
                                        </th>
                                        <td className="px-6 py-4">{student.email}</td>
                                        <td className="px-6 py-4">{student.roll_no}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={3} className="text-center p-4">No students found for your search.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default SharePage;