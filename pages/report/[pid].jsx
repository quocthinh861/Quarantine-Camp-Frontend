import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import { useRouter } from "next/router";
import { formatDateAndTime } from "../../utils/TimeUtil";

function report() {
  const router = useRouter();
  const { pid } = router.query;

  const [testResults, setTestResults] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [patient, setPatient] = useState({});
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    // get pid from params
    axiosInstance.get("patient/getPatientById/" + pid).then((response) => {
      if (response.status === 200) {
        setPatient(response.data.result);
        setSymptoms(response.data.result.symptoms);
        setTreatments(response.data.result.treatments);
      }
    });

    axiosInstance.get("/test-results/" + pid).then((response) => {
      setTestResults(response.data);
    });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Personal Information</h1>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <div id="personal-info" class="bg-gray-200 p-4 mb-5 rounded-md">
                <div className="mb-4 flex">
                  <div className="w-1/3">
                    <label className="block text-gray-700 font-bold mb-2">
                      FirstName:
                    </label>
                    <p className="text-gray-800">{patient.firstName}</p>
                  </div>
                  <div className="w-1/3 pl-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      MiddleName:
                    </label>
                    <p className="text-gray-800">{patient.middleName}</p>
                  </div>
                  <div className="w-1/3 pl-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      LastName:
                    </label>
                    <p className="text-gray-800">{patient.lastName}</p>
                  </div>
                </div>
                <div className="mb-4 flex">
                  <div class="w-1/3">
                    <label class="block text-gray-700 font-bold mb-2">
                      Gender:
                    </label>
                    <p class="text-gray-800">{patient.gender}</p>
                  </div>
                  <div className="w-1/3 pl-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Address:
                    </label>
                    <p className="text-gray-800">{patient.address}</p>
                  </div>
                  {patient.previousLocation && (
                    <div className="w-1/3 pl-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Previous Location:
                      </label>
                      <p className="text-gray-800">
                        {patient.previousLocation}
                      </p>
                    </div>
                  )}
                </div>
                <div class="mb-4 flex">
                  <div class="w-1/3">
                    <label class="block text-gray-700 font-bold mb-2">
                      Phone Number:
                    </label>
                    <p class="text-gray-800">{patient.phoneNumber}</p>
                  </div>
                  <div class="w-1/3 pl-4">
                    <label class="block text-gray-700 font-bold mb-2">
                      Comorbidities:
                    </label>
                    <p class="text-gray-800">
                      {" "}
                      {patient.comorbidities && patient.comorbidities.length > 0
                        ? patient.comorbidities.map((commorbity, index) => {
                            return (
                              <div
                                key={index}
                                className="flex items-center justify-between"
                              >
                                {commorbity.comorbidity
                                  .charAt(0)
                                  .toUpperCase() +
                                  commorbity.comorbidity.slice(1)}
                              </div>
                            );
                          })
                        : "--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">Testing Summary</h1>
      <div class="flex flex-col mb-5">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Result
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Cycle Threshold
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Blood Oxygen Level
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Breaths Per Minute
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {testResults.map((testResult) => (
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                        {testResult._id}
                      </td>
                      <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                        {formatDateAndTime(testResult._time)}
                      </td>
                      <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                        {testResult._type}
                      </td>
                      <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                        {testResult._result}
                      </td>
                      <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                        {testResult._cycle_threshold}
                      </td>
                      <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                        {testResult._blood_oxygen_level}
                      </td>
                      <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                        {testResult._breaths_per_minute}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">Symptom Status</h1>
      <div class="flex flex-col mb-5">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Symptom Name
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Record Time
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Is Serious
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {symptoms &&
                    symptoms.map((symptom) => (
                      <tr class="border-b dark:border-neutral-500">
                        <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          {symptom.symptomName}
                        </td>
                        <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          {formatDateAndTime(symptom.recordTime)}
                        </td>
                        <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          <input type="checkbox" checked={symptom.isSerious} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4">
          Treatment & Medication Information
        </h1>
      </div>
      {treatments &&
        treatments.map((treatment, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-bold mb-2">{`Treatment ${
              index + 1
            }`}</h3>
            <a className="float-right">
              Treated by: Dr {treatment.doctor.name}
            </a>
            <p className="mb-4">
              <strong>Start Date:</strong>{" "}
              {formatDateAndTime(treatment.startTime)}
              <b className="mx-2">-</b>
              <strong>End Date:</strong> {formatDateAndTime(treatment.endTime)}
            </p>

            <table className="w-full border-collapse border mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Medication</th>
                  <th className="border p-2">Effect</th>
                  <th className="border p-2">Price ($)</th>
                  <th className="border p-2">Expired Date</th>
                </tr>
              </thead>
              <tbody>
                {treatment.medications.map((medication, medIndex) => (
                  <tr
                    key={medIndex}
                    className={medIndex % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="border p-2">{medication.name}</td>
                    <td className="border p-2">{medication.effect}</td>
                    <td className="border p-2">{medication.price}</td>
                    <td className="border p-2">
                      {formatDateAndTime(medication.expirationDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </>
  );
}

export default report;
