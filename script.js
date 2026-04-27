//Function to calculate income tax
function calculateTax(grossSalary) {

    // If salary is 5000 or less ==> no tax
    if (grossSalary <= 5000) {
        return 0;
    }
    // If salary is above 5000 and up to 6000 ==> 5% tax
    else if (grossSalary <= 6000) {
        return grossSalary * 0.05;
    }

    // If salary is above 6000 and up to 6500 ==> 7% tax
    else if (grossSalary <= 6500) {
        return grossSalary * 0.07;
    }

    // If salary is above 6500 and up to 8000 ==> 10% tax
    else if (grossSalary <= 8000) {
        return grossSalary * 0.10;
    }

    // If salary is above 8000 ==> 12% tax
    else {
        return grossSalary * 0.12;
    }
}


// Main salary processing function
function processSalary({
    employeeName,
    position,
    baseSalary,
    hoursWorked,
    employeeType,
    salesCount = 0,
    saleValue = 0,
    month,
    year
}) {

    // Step 1: Calculate Required Monthly Hours

    // Company requires 45 hours per week
    const requiredWeeklyHours = 45;

    // Approximate monthly hours (4 weeks)
    const requiredMonthlyHours = requiredWeeklyHours * 4;

    // Step 2: Calculate Overtime Hours

    let overtimeHours = 0;

    if (hoursWorked > requiredMonthlyHours) {
        overtimeHours = hoursWorked - requiredMonthlyHours;
    }

     // Step 3: Calculate Overtime Pay

    // Each extra hour earns 2% of base salary
    const overtimePay = overtimeHours * (baseSalary * 0.02);

      // Step 4: Calculate Bonus
    let bonus = 0;

    // Managers get 5% bonus
    if (employeeType === "manager") {
        bonus = (baseSalary + overtimePay) * 0.05;
    }

    // Executives get 8% bonus
    else if (employeeType === "executive") {
        bonus = (baseSalary + overtimePay) * 0.08;
    }

       // Step 5: Calculate Commission

    let commission = 0;

    // Sales agent earns 4% per sale
    if (employeeType === "sales") {
        commission = (salesCount * saleValue) * 0.04;
    }



    // Step 6: Calculate Gross Salary

    const grossSalary = baseSalary + overtimePay + bonus + commission;

       // Step 7: Pension Deduction

    const pension = grossSalary * 0.12;


    // Step 8: Tax Deduction  ======================================================

    const tax = calculateTax(grossSalary - pension);

    // Step 9: Net Salary

    const netSalary = grossSalary - pension - tax;

  // Step 10: Generate Pay Slip

    const paySlip = `
EMPLOYEE PAY SLIP - ${month} ${year}

Employee Name : ${employeeName}
Position      : ${position}
Employee Type : ${employeeType}

Base Salary   : GHS ${baseSalary.toFixed(2)}
Overtime Pay  : GHS ${overtimePay.toFixed(2)}
Bonus          : GHS ${bonus.toFixed(2)}
Commission     : GHS ${commission.toFixed(2)}

Gross Salary   : GHS ${grossSalary.toFixed(2)}
Pension (12%)  : GHS ${pension.toFixed(2)}
Tax Deduction  : GHS ${tax.toFixed(2)}

Net Salary     : GHS ${netSalary.toFixed(2)}
`;

   // Print to console
    console.log(paySlip);


    // Return pay slip
    return paySlip;
}

// Sanity check Q1.
// CFO January 2026

processSalary({
    employeeName: "Daniel Kakabiku",
    position: "Chief Financial Officer",
    baseSalary: 23000,
    hoursWorked: 190, // 10 hours overtime
    employeeType: "executive",
    month: "January",
    year: 2026
});


// Q2. Sales Agent December 2025

processSalary({
    employeeName: "Ama Serwaa",
    position: "Sales Agent",
    baseSalary: 5000,
    hoursWorked: 180,
    employeeType: "sales",
    salesCount: 7,
    saleValue: 23000,
    month: "December",
    year: 2025
});
