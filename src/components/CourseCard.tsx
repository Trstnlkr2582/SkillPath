import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { basic } from '../styles/Layouts';
import ProgressBar from './Progressbar';

interface CourseCardProps {
  title: string;
  category: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  tag: string;
  tagBg: string;
  tagText: string;
}

export default function CourseCard({
  title,
  category,
  progress,
  completedLessons,
  totalLessons,
  tag,
  tagBg,
  tagText,
}: CourseCardProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.75}>
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={[basic.rawMedium, styles.category]}>{category}</Text>
          <Text style={[basic.rawBoldText, styles.title]} numberOfLines={2}>
            {title}
          </Text>
        </View>
        <View style={[styles.tag, { backgroundColor: tagBg }]}>
          <Text style={[basic.rawMedium, styles.tagLabel, { color: tagText }]}>
            {tag}
          </Text>
        </View>
      </View>

      <ProgressBar progress={progress} color="#075343" />

      <View style={styles.bottomRow}>
        <Text style={[basic.rawText, styles.meta]}>
          {completedLessons}/{totalLessons} lecciones
        </Text>
        <Text style={[basic.rawMedium, styles.meta, { color: '#075343' }]}>
          {progress}%
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F4F3',
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  category: {
    fontSize: 11,
    color: '#2A6B5A',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    color: '#3F4945',
    lineHeight: 20,
  },
  tag: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  tagLabel: {
    fontSize: 11,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meta: {
    fontSize: 12,
    color: '#707975',
  },
});