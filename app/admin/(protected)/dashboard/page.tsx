import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/auth";
import { canManageSettings, canManageUsers } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma";

const phaseModules = [
  { key: "Messages", label: "الرسائل" },
  { key: "Translations", label: "الترجمات" },
  { key: "Settings", label: "الإعدادات" },
  { key: "Users", label: "المستخدمون" },
];

export default async function AdminDashboardPage() {
  const user = await requireAdmin();
  const [pages, services, projects, sectors, partners, teamMembers] = await Promise.all([
    prisma.page.count({ where: { deletedAt: null } }),
    prisma.service.count({ where: { deletedAt: null } }),
    prisma.project.count({ where: { deletedAt: null } }),
    prisma.sector.count({ where: { deletedAt: null } }),
    prisma.partner.count({ where: { deletedAt: null } }),
    prisma.teamMember.count({ where: { deletedAt: null } }),
  ]);

  const cmsModules = [
    { module: "الصفحات", count: pages },
    { module: "الخدمات", count: services },
    { module: "المشاريع", count: projects },
    { module: "القطاعات", count: sectors },
    { module: "الشركاء", count: partners },
    { module: "الفريق", count: teamMembers },
  ];

  const visibleModules = phaseModules.filter((module) => {
    if (module.key === "Users") {
      return canManageUsers(user);
    }

    if (module.key === "Settings") {
      return canManageSettings(user);
    }

    return true;
  });

  return (
    <div>
      <Badge tone="orange">نظرة عامة</Badge>
      <h2 className="mt-4 text-3xl font-semibold text-petrol">عمليات إدارة المحتوى</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-petrol/65">
        إدارة وحدات المحتوى ثنائية اللغة ومفاتيح الترجمة والأدوات الإدارية المحمية من مساحة واحدة واضحة.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cmsModules.map((item) => (
          <Card className="min-h-28" key={item.module}>
            <p className="font-semibold text-petrol">{item.module}</p>
            <p className="mt-3 text-3xl font-semibold text-orange">{item.count}</p>
            <p className="mt-2 text-sm text-petrol/60">سجلات المحتوى</p>
          </Card>
        ))}
        {visibleModules.map((module) => (
          <Card className="min-h-28" key={module.key}>
            <p className="font-semibold text-petrol">{module.label}</p>
            <p className="mt-3 text-sm text-petrol/60">وحدة إدارية</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
