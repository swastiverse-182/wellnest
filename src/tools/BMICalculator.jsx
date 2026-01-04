import { useState } from "react";

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) return;

    const h = height / 100;
    const bmiValue = weight / (h * h);
    const roundedBMI = bmiValue.toFixed(2);

    setBmi(roundedBMI);

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 25) setCategory("Normal");
    else if (bmiValue < 30) setCategory("Overweight");
    else setCategory("Obese");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        BMI Calculator
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={calculateBMI}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
        >
          Calculate BMI
        </button>
      </div>

      {bmi && (
        <div className="mt-6 bg-green-50 p-4 rounded-lg text-center">
          <p className="text-lg">
            <span className="font-semibold">BMI:</span> {bmi}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Category:</span> {category}
          </p>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;
