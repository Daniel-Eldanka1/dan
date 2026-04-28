// Function to calculate income tax
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

    // Calculating Required Monthly Hours (4 weeks = 1 month)

    // Company requires 45 hours per week
    const requiredWeeklyHours = 45;

    // Convert the weeks (4 weeks) to month
    const requiredMonthlyHours = requiredWeeklyHours * 4;

    // Calculating Overtime Hours

    let overtimeHours = 0;

    if (hoursWorked > requiredMonthlyHours) {
        overtimeHours = hoursWorked - requiredMonthlyHours;
    }


    // Each extra hour earns 2% of base salary
    const overtimePay = overtimeHours * (baseSalary * 0.02);

      // Calculate Bonus
    let bonus = 0;

    // Managers get 5% bonus
    if (employeeType === "manager") {
        bonus = (baseSalary + overtimePay) * 0.05;
    }

    // Executives get 8% bonus
    else if (employeeType === "executive") {
        bonus = (baseSalary + overtimePay) * 0.08;
    }

       // Calculate Commission

    let commission = 0;

    // Sales agent 4% commission per sale
    if (employeeType === "sales") {
        commission = (salesCount * saleValue) * 0.04;
    }



    // Calculating Gross Salary

    const grossSalary = baseSalary + overtimePay + bonus + commission;

       //  Pension Deduction ==> 12%

    const pension = grossSalary * 0.12;


    // Tax Deduction (the % is calculated from the income rate "calculatedTax" after the pension is taken from the gross salary)

    const tax = calculateTax(grossSalary - pension);

    // Net Salary

    const netSalary = grossSalary - pension - tax;

  // Pay Slip template

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

// Q1. CFO January 2026

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

