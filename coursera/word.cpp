#include<iostream>  
#include<cstring>
using namespace std;

int main() {
    char a[1000][41];
    int n, sum = 0;

    cin >> n;
    for (int i = 0; i < n; i++)
        cin >> a[i];

    sum += strlen(a[0]);
    cout << a[0] << ' ';

    for (int i = 1; i < n; i++){
        sum += strlen(a[i]) + 1;
        if (sum > 80){
            cout << endl;
            sum = 0;
            sum += strlen(a[i]);
        }
        cout << a[i] << ' ';
    }
    cout << endl;

    return 0;
}