
#include<iostream>
using namespace std;
int main() {
  int m, n;
  cin >> m >> n;
  int mount[20][20];
  for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
      cin >> mount[i][j];
    }
  }
  for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
      if (((mount[i][j] >= mount[i-1][j]&&i-1>=0)||(i-1<0))&& ((mount[i][j] >= mount[i + 1][j] && i + 1 <= m-1) || (i + 1>m-1))&& ((mount[i][j] >= mount[i][j-1] && j - 1 >= 0) || (j - 1<0))&& ((mount[i][j] >= mount[i][j+1] && j + 1 <= n-1) || (j + 1>n-1)))//逻辑关系的运算，重点是对边框处的处理
        cout << i << ' ' << j << endl;
    }
  }
  return 0;
}