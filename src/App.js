import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
    const [incomeInput, setIncomeInput] = useState({ source: "", amount: "" });
    const [income, setIncome] = useState([]);
    const [incomeId, setIncomId] = useState();
    const [incomebtn, setIncomebtn] = useState(true)

    const [expenseInput, setExpenseInput] = useState({ category: "", item: "", price: "" });
    const [expense, setExpense] = useState([]);
    const [expenseId, setExpenseId] = useState();
    const [expensebtn, setExpensebtn] = useState(true);
    const [category, setCategory] = useState("");

    // ============= handling Incom =============
    function handleIncome(event) {
        const { name, value } = event.target;
        setIncomeInput((prevInput) => {
            return { ...prevInput, [name]: value }
        })
    }

    function submitIncome(event) {
        event.preventDefault();
        setIncome((prevIncome) => {
            return [...prevIncome, incomeInput]
        })
        setIncomeInput({ source: "", amount: "" })
    }

    function editIncom(id) {
        setIncomId(id)
        var data = income.find((data, index) => {
            return index === id
        });
        setIncomeInput(data);
        setIncomebtn(false)
    }
    function updateIncome(event) {
        event.preventDefault();
        setIncome((prevInput) => {
            prevInput[incomeId] = incomeInput
            return [...prevInput]
        })

        setIncomeInput({ source: "", amount: "" })
        setIncomebtn(true)
    }
    function deleteIncom(id) {
        console.log(id);
        setIncome((prevIncom) => {
            return prevIncom.filter((income, index) => {
                return index !== id;
            })
        })

    }
    var totalIncome = income.reduce((pv, cv) => pv = pv + Number(cv.amount, 10), 0);

    // ============= handling expense ============
    function handleExpense(event) {
        const { name, value } = event.target;
        setExpenseInput((prevInput) => {
            return { ...prevInput, [name]: value }
        })
    }
    function submitExpense(event) {
        event.preventDefault();
        setExpense((prevInput) => {
            return [...prevInput, expenseInput]
        })
        setExpenseInput({ category: "", item: "", price: "" })
    }
    function editExpense(id) {
        setExpenseId(id)
        var data = expense.find((data, index) => {
            return index === id
        });
        setExpenseInput(data);
        setExpensebtn(false)
    }
    function updateExpense(event) {
        event.preventDefault();
        console.log(expenseId);
        setExpense((prevInput) => {
            prevInput[expenseId] = expenseInput
            return [...prevInput]
        })
        setExpenseInput({ category: "", item: "", price: "" })
        setExpensebtn(true)
    }
    function deleteExpense(id) {
        console.log(id);
        setExpense((prevExpense) => {
            return prevExpense.filter((expense, index) => {
                return index !== id;
            })
        })

    }
    var totalExpense = expense.reduce((pv, cv) => pv = pv + Number(cv.price, 10), 0);

    function categorySorting(event) {
        setCategory(event.target.value);     
    }

    return (<div className='main_conatiner'>
        <div className='income_section'>
            <div className='incomForm'>
                <h3>Income</h3>
                <form className=''>
                    <input
                        type="text"
                        name='source'
                        value={incomeInput.source}
                        className='inputfield'
                        placeholder='source'
                        onChange={handleIncome}
                    />
                    <input
                        type="number"
                        name='amount'
                        value={incomeInput.amount}
                        className='inputfield'
                        placeholder='Amount'
                        onChange={handleIncome}
                    /><br />
                    {incomebtn ? <button type="submit" onClick={submitIncome} className="btn">Submit</button> : <button type="submit" onClick={updateIncome} className="btn">Update</button>
                    }
                </form>
                <div className='incomTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>source</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {income.map((element, index) => {
                                return (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{element.source}</td>
                                        <td>{element.amount}</td>
                                        <td>
                                            <i
                                                className="fa-solid fa-pen-to-square"
                                                onClick={() => { editIncom(index) }}>
                                            </i>
                                            <i
                                                className="fa-solid fa-trash"
                                                onClick={() => { deleteIncom(index) }}>
                                            </i>
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan={2}>Total</td>
                                <td>{totalIncome}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>

        <div className='main'>
            <div className='form_section'>
                <form className='' >
                    <select name='category' onChange={handleExpense}>
                        <option value="">--- Select Category --- </option>
                        <option value="Grocery">Grocery </option>
                        <option value="Veggies">Veggies </option>
                        <option value="Travelling">Travelling </option>
                        <option value="Miscellaneous">Miscellaneous </option>
                    </select>
                    <br />
                    <input
                        type="text"
                        name='item'
                        value={expenseInput.item}
                        className='inputfield'
                        placeholder='item'
                        onChange={handleExpense}
                    />
                    <br />
                    <input
                        type="number"
                        name='price'
                        value={expenseInput.price}
                        className='inputfield'
                        placeholder='Amount'
                        onChange={handleExpense}
                    />
                    <br />
                    {expensebtn ?
                        <button type="submit" onClick={submitExpense} className="btn">Submit</button>
                        : <button type="submit" onClick={updateExpense} className="btn">Update</button>}
                </form>
            </div>
            <div className='table_section'>
                <div className='table'>
                    <select name='category' onChange={categorySorting}>
                        <option value="">--- Select Category --- </option>
                        <option value="Grocery">Grocery </option>
                        <option value="Veggies">Veggies </option>
                        <option value="Travelling">Travelling </option>
                        <option value="Miscellaneous">Miscellaneous </option>
                    </select>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category === "" ? expense.map((element, index) => {
                                return (
                                    <tr>
                                        <td>{element.category}</td>
                                        <td>{element.item}</td>
                                        <td>{element.price}</td>
                                        <td>
                                            <i className="fa-solid fa-pen-to-square" onClick={() => { editExpense(index) }}></i>
                                            <i className="fa-solid fa-trash" onClick={() => { deleteExpense(index) }}></i>
                                        </td>
                                    </tr>
                                )
                            }) : expense.map((element, index) => {
                                if(category === element.category){
                                return (
                                    <tr>
                                        <td>{element.category}</td>
                                        <td>{element.item}</td>
                                        <td>{element.price}</td>
                                        <td>
                                            <i className="fa-solid fa-pen-to-square" onClick={() => { editExpense(index) }}></i>
                                            <i className="fa-solid fa-trash" onClick={() => { deleteExpense(index) }}></i>
                                        </td>
                                    </tr>)}
                            })}
                            <tr>
                                <td colSpan={2}>Total</td>
                                <td>{totalExpense}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>
    );
}

export default App;
