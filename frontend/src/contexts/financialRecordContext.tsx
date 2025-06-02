import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface FinancialRecord {
    _id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

interface FinancialRecordContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<FinancialRecordContextType | undefined>(undefined);

export const FinancialRecordProvider = ({
    children,
} : {
    children: React.ReactNode;
}) => {

    const [records, setRecords] = useState<FinancialRecord[]>([]);

    const { user } = useUser();

    const fetchRecords = async () => {

        if (!user) return;

        const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/financialRecords/getAllByUserID/${user.id}`
        );

        if (response.ok) {
            const records = await response.json();
            setRecords(records);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [user]);

    const addRecord = async (record: FinancialRecord) => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/financialRecords`, {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json",
            },
        });

        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord])
            }
        } catch (error) {
          console.log(error);  
        }
    };

    // Function to update a record
    const updateRecord = async (id: string, newRecord: FinancialRecord) => {

        // if (!user) return;

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/financialRecords/${id}`, {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers: {
                "Content-Type": "application/json",
            },
        });

        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => prev.map((record) => 
                   record._id === id ? newRecord : record))
            }
        } catch (error) {
          console.log(error);  
        }
    };

    // Function to delete a record
    const deleteRecord = async (id: string) => {

        // if (!user) return;

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/financialRecords/${id}`, {
            method: "DELETE",
        });

        try {
            if (response.ok) {
                const deletedRecord = await response.json();
                setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id))
            }
        } catch (error) {
          console.log(error);  
        }
    };

    return (
        <FinancialRecordsContext.Provider value={{records, addRecord, updateRecord, deleteRecord}}>
            {" "}
            {children}
        </FinancialRecordsContext.Provider>
    );
}

export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordContextType | undefined>(
        FinancialRecordsContext
    );

    if (!context) {
        throw new Error("useFinancialRecords must be within FinancialRecordProvider");
    }
    return context;
}