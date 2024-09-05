import React, {StyleSheet, Text, View} from 'react-native';

interface DataTableProps {
  data: LapSummary[];
  columns: string[];
  title: string;
}

interface LapSummary {
  lapNumber: number;
  lapDistance: number;
  maxCadence?: number;
  minCadence?: number;
  maxElevation?: number;
  minElevation?: number;
  maxHeartRate?: number;
  minHeartRate?: number;
  maxSpeed?: number;
  minSpeed?: number;
}

export const DataTable = ({data, columns, title}: DataTableProps) => {
  const columnKeyMap: {[key: string]: keyof LapSummary} = {
    'Max elevation': 'maxElevation',
    'Min elevation': 'minElevation',
    'Max heart rate': 'maxHeartRate',
    'Min heart rate': 'minHeartRate',
    'Max cadence': 'maxCadence',
    'Min cadence': 'minCadence',
    'Max speed': 'maxSpeed',
    'Min speed': 'minSpeed',
  };

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>{title}</Text>
      <View style={styles.tableHeader}>
        {columns.map((col, index) => (
          <Text key={index} style={styles.headerText}>
            {col}
          </Text>
        ))}
      </View>
      {data.map((lap, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.cell}>{index + 1}</Text>
          {columns.slice(1).map((col, colIndex) => (
            <Text key={colIndex} style={styles.cell}>
              {col === 'Lap'
                ? index + 1
                : lap[columnKeyMap[col]] !== undefined
                ? lap[columnKeyMap[col]]?.toFixed(2)
                : '-'}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f2870a',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    padding: 2,
  },
});
