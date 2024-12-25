import React from 'react';
import { useStore } from '../Pages/utils/store';
import { Check, Clock } from 'lucide-react';

export function MedicationList() {
  const { medications, toggleMedication } = useStore();

  return (
    <div className="space-y-4">
      {medications.map((medication) => (
        <div
          key={medication.id}
          className={`card flex items-center justify-between ${medication.taken ? 'bg-green-50' : 'bg-white'}`}
        >
          <div>
            <h3 className="text-2xl font-semibold">{medication.name}</h3>
            <p className="text-xl text-gray-600">{medication.description}</p>
            <div className="flex items-center gap-2 mt-2 text-xl">
              <Clock className="w-6 h-6 text-primary-500" />
              {medication.time}
            </div>
          </div>
          <button
            onClick={() => toggleMedication(medication.id)}
            className={`${medication.taken ? 'btn-secondary' : 'btn-primary'} flex items-center gap-2`}
          >
            <Check className="w-6 h-6" />
            {medication.taken ? 'Taken' : 'Mark as Taken'}
          </button>
        </div>
      ))}
    </div>
  );
}