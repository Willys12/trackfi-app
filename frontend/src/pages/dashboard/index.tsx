import { useUser } from "@clerk/clerk-react";
import { FinancialRecordList } from "./FinancialRecordList";
import { FinancialRecordForm } from "./FinancialRecordForm";
import "./financial-record.css";
import { useMemo } from "react";
import { useFinancialRecords } from "../../contexts/financialRecordContext";

export const Dashboard = () => {

    const { user } = useUser();

    const { records } = useFinancialRecords();

    const totalMonthlyExp = useMemo(() => {
        let totalAmount = 0;
        records.forEach((record) => {
            totalAmount += record.amount;
        });
        // Assuming records are fetched for the current month
        return totalAmount;
    }, [records]);

    return (
        <div className="dashboard-container">
            <h2>Welcome back {user?.firstName}! Track your expenses with ease</h2>
            <FinancialRecordForm />
            <div>
                <h4>{user?.firstName} your total monthly expenses are Ksh.{totalMonthlyExp}</h4>
            </div>
            <FinancialRecordList />

            {/* About section */}
            <div className="about-section">
                <h3>About: This web app helps you track monthly expenses, set financial goals, and manage your budget with ease.</h3>
            </div>

            <footer className="footer">
                <p>© 2025 TrackFi Expense Tracker. All rights reserved.</p>
                <p>Developed by Ben Willys</p>
            </footer>
        </div>        
    );
}