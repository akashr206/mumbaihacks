import { callGemini } from "../utils/gemini-client.js";

export async function predictLoadNode(state) {
    const { critical_incidents, hospital, inventory, wards, doctorDetails } =
        state;
    const prompt = [
        `You are an expert hospital operations analyst. Given the hospital metadata, hospital inventory, a list of critical incidents (with estimated additional patients), predict:`,
        `1) short predicted patient load increase over next 24 hours (number)`,
        `2) suggested staff redeployment or staff-addition plan for each ward, including recommended staffing numbers.`,
        `3) essential inventory items likely to run low and suggested reorder quantities.`,
        `Return a JSON object: { predictedPatientIncrease: number, staffPlan: [{...}], inventoryPlan: [{...}] }`,
        `Example Output : 
        { predictedPatientIncrease: 17,
        staffPlan: [
           {
            plan : "redeployment" or "addition",
            fromWard: "from_ward", 
            toWard: "to_ward", 
            staff: {doctor: 2, nurse: 6}
            notes : "reason_for_redeployment_or_addition" 
            },
           {
            plan : "addition" or "redeployment,
            fromWard: "from_ward", 
            toWard: "to_ward", 
            staff: {doctor: [{role : "role_of_the_doctor", number : "number_of_doctors_of_given_role"}, ... ], nurse: "number of nurses"}
            notes : "reason_for_redeployment_or_addition"
            } ,
             .... 
        ], inventoryPlan: [
        {itemId : "item_id" //if item doesn't exist give id as 'new_item', item: "item_name", toBeAddedQuantity: 40, reason: "reason_to_increase_inventory", currentQuantity: 150} 
        ]}`,
        `If item required is not mentioned in inventory, then assume that item doesn't exist in the inventory and give id as 'new_item' to add it to the inventory`,
        `Write the staff redeployment plan for all the wards, if no redeployment is required then do not include that ward in the plan`,
        `You must mention the role of the doctor to redeploy or add and number of them to redeploy to specific ward`,
        `Be more specific in the plan. Do not give responses like may require or something like that`,
        `Prioritize redeployment of staff over addition of staff, as redeployment can be done immediately. Do addition of staffs only in the worst case scenarios.`,
        `\nHospital metadata:\n${JSON.stringify(hospital, null, 2)}`,
        `\nHospital wards data:\n${JSON.stringify(wards, null, 2)}`,
        `\nHospital inventory:\n${JSON.stringify(inventory, null, 2)}`,
        `\nDoctor details:\n${JSON.stringify(doctorDetails, null, 2)}`,
        `\nCritical incidents:\n${JSON.stringify(critical_incidents, null, 2)}`,
    ];

    const text = await callGemini(prompt);
    try {
        const start = text.indexOf("{");
        const jsonStr = text.slice(start);
        const parsed = JSON.parse(jsonStr);
        return { analysis: parsed, raw: text };
    } catch (e) {
        return { analysis: null, raw: text };
    }
}
