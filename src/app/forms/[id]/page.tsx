import React from 'react';
import { getFormById, getFormWithSubmissions } from '@/actions/actions';
import VisitBtn from '@/components/forms/VisitBtn';
import FormLinkShare from '@/components/forms/FormLinkShare';
import { StatCard } from '@/components/dashboard/Cards';
import { FormElementInstance, TElementsType } from '@/components/dashboard-user/FormElement';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDistance } from 'date-fns';

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const { id } = params;
  const form = await getFormById(id);
  if (!form) {
    throw new Error('Form not found');
  }

  const { visits, submissions } = form;
  let submissionsRate = 0;
  if (visits > 0) {
    submissionsRate = (submissions / visits) * 100;
  }
  let bounceRate = 0;
  if (submissionsRate > 0) {
    bounceRate = 100 - submissionsRate;
  }

  return (
    <>
      <div className="border-muted border-b py-10">
        <div className="container mx-auto flex justify-between">
          <h1 className="truncate text-4xl font-bold">{form.name}</h1>
          <VisitBtn shareUrl={form.shareUrl} />
        </div>
      </div>
      <div className="border-muted border-b py-4">
        <div className="container mx-auto flex items-center justify-between gap-2">
          <FormLinkShare shareUrl={form.shareUrl} />
        </div>
      </div>
      <div className="container mx-auto grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total visits" value={visits.toLocaleString()} type="view" />
        <StatCard title="Total submissions" value={submissions} type="calculator" />
        <StatCard title="Submission rate" value={`${submissionsRate} %`} type="mousePointer" />
        <StatCard title="Bounce rate" value={`${bounceRate} %`} type="star" />
      </div>
      <div className="container mx-auto pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
};

export default Page;

type TRowTable = { [key: string]: string } & { submittedAt: Date };
async function SubmissionsTable({ id }: { id: string }) {
  const form = await getFormWithSubmissions(id);
  if (!form) {
    throw new Error('Form not found');
  }
  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: TElementsType;
  }[] = [];
  formElements.forEach(formElement => {
    switch (formElement.type) {
      case 'TextField':
        columns.push({
          id: formElement.id,
          label: formElement.additionalAttributes?.label,
          required: formElement.additionalAttributes?.required,
          type: formElement.type,
        });
        break;
      default:
        break;
    }
  });
  const rows: TRowTable[] = [];
  form.formSubmiss.forEach(submission => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });
  return (
    <>
      <h1 className="my-4 text-2xl font-bold">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead key={column.id}>{column.label}</TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right">Submitted at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map(column => (
                  <RowCell key={column.id} type={column.type} value={row[column.id]} />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
function RowCell({ type, value }: { type: TElementsType; value: string }) {
  let node: React.ReactNode = value;
  return <TableCell>{node}</TableCell>;
}
