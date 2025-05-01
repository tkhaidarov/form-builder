import { getForms } from '@/actions/actions';
import React from 'react';
import { Form } from '@/generated/prisma';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';
import { viewIcon, clipboardIcon } from '@/definitions/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function FormCard({ form }: { form: Form }) {
  return (
    <Card className="h-48 gap-5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant="destructive">Draft</Badge>}
        </CardTitle>
        <CardDescription className="text-muted-foreground flex items-center justify-between text-sm">
          {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          {form.published && (
            <span className="flex items-center gap-2">
              {viewIcon}
              <span>{form.visits.toLocaleString()}</span>
              {clipboardIcon}
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground h-5 truncate text-sm leading-none">
        {form.description || 'No description'}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="text-md w-full gap-4">
            <Link href={`/form/${form.id}`}>View submissions</Link>
          </Button>
        )}
        {!form.published && (
          <Button asChild className="text-md w-full">
            <Link href={`/form-builder/${form.id}`}>Edit form</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default async function FormCards() {
  const forms = await getForms();
  return (
    <>
      {forms.map(form => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}
