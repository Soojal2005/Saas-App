import React from 'react';
import Link from 'next/link';
import { cn, getSubjectColor } from '@/lib/utils';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import Image from 'next/image';

interface Companion {
  id: string;
  subject: string;
  name: string;
  topic: string;
  duration: number | string; // Duration can be a number or string for flexibility
}

interface CompanionListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

export default function CompanionList({
  title,
  companions = [],
  classNames,
}: CompanionListProps) {
  return (
    <article
      className={cn('companion-list', classNames)}
      style={{
        border: '1px solid #1c1414ff',
        padding: '20px',
        borderRadius: '12px',
      }}
    >
      <h2 className="font-bold text-3xl mb-4">{title}</h2>

      {/* Responsive Scrollable Table Container */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[600px] w-full max-w-6xl mx-auto">
          <TableCaption>List of recent sessions with companions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base w-1/2">Lessons</TableHead>
              <TableHead className="text-base">Subjects</TableHead>
              <TableHead className="text-base text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {companions.map(({ id, subject, name, topic, duration }) => (
              <TableRow key={id}>
                <TableCell>
                  <Link href={`/companions/${id}`} className="text-blue-600 hover:underline">
                    <div className="flex items-center gap-2">
                      {/* Subject Icon — Hidden on small screens */}
                      <div
                        className="size-14 flex items-center justify-center rounded-lg hidden md:flex"
                        style={{ backgroundColor: getSubjectColor(subject) }}
                      >
                        <Image
                          src={`/icons/${subject}.svg`}
                          alt={subject}
                          width={35}
                          height={35}
                        />
                      </div>

                      {/* Text Info */}
                      <div className="flex flex-col">
                        <span className="font-semibold">{name}</span>
                        <span className="text-sm text-muted-foreground">{topic}</span>
                      </div>
                    </div>
                  </Link>
                </TableCell>

                <TableCell className = "font-bold text-[1.4vw]">{subject}</TableCell>
                <TableCell className="text-right">{duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </article>
  );
}
