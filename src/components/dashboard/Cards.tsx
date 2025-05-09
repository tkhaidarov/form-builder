import { iconMap } from '@/definitions/constants';
import { ICardProps } from '@/definitions/definitions';
import { Card, CardContent } from '@/components/ui/card';
import { getFormStats } from '@/actions/actions';
// fetchCardData() нужно создать
export /*async*/ function CardWrapper() {
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();

  return (
    <>
      <StatCard title="Total users" value={28} type="users" />
      <StatCard title="Super users" value={11} type="superusers" />
      <StatCard title="Active users" value={19} type="activeUsers" />
      <StatCard title="Blocked users" value={94} type="blockedUsers" />
    </>
  );
}

export async function UserDashboardStatsCard() {
  const { visits, submissions, submissionsRate, bounceRate } = await getFormStats();
  return (
    <>
      <StatCard title="Total visits" value={visits.toLocaleString() || ''} type="view" />
      <StatCard title="Total submissions" value={submissions} type="calculator" />
      <StatCard title="Submission rate" value={`${submissionsRate} %`} type="mousePointer" />
      <StatCard title="Bounce rate" value={`${bounceRate} %`} type="star" />
    </>
  );
}

export function StatCard({ title, value, type }: ICardProps) {
  const Icon = iconMap[type];
  return (
    <Card className="rounded-xl p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="dark:text-card-foreground h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <CardContent className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl dark:bg-neutral-800">
        <p>{value}</p>
      </CardContent>
    </Card>
  );
}
