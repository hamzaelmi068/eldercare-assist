import { MedicationList } from '../components/MedicationList';

export default function Medications() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8">Medications</h1>
      <MedicationList />
    </div>
  );
}