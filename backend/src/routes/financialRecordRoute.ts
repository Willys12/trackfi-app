import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/financialRecord";

const router = express.Router();

router.get("/getAllByUserID/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecordModel.find({ userId: userId });

    if (records.length === 0) {
        return res.status(404).send("No records found for this user");
    }
    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new FinancialRecordModel(newRecordBody);
        
        const savedRecord = await newRecord.save();

        res.status(200).send(savedRecord);
    } catch (error) {
        console.log(error);
      res.status(500).send({ message: 'There was an error when saving' });  
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const updateRecord = await FinancialRecordModel.findByIdAndUpdate(
            id, 
            newRecordBody,
            { new: true }
         );

         if (!updateRecord) {
            return res.status(404).send("Record not found");
        }
         res.status(200).send(updateRecord);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'There was an error updating' });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);

    if (!record) {
      return res.status(404).send();
    }
    res.status(200).send(record);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "There was an error deleting" });  
  }
})

export default router;