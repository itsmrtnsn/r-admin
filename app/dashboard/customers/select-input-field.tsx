import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  selectItems: { id: string; label: string; value: string }[];
  placeHolder?: string;
}

const SelectInputField = ({
  selectItems,
  placeHolder = 'Select a Value',
}: Props) => {
  return (
    <div className='w-full space-y-2'>
      <Label className='font-normal'>Selet</Label>
      <Select>
        <SelectTrigger className='w-full border-[0.1px] border-gray-300 shadow-none h-10'>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent className='shadow-none'>
          {selectItems.map((item) => (
            <SelectItem key={item.id} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInputField;
