#include <iostream>
#include <vector>
#include <algorithm>
#include <set>

using namespace std;

class UnionFind {
public:
    vector<int> parent, rank;
    
    UnionFind(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; ++i) {
            parent[i] = i;
        }
    }

    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    bool unionSets(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);

        if (rootX != rootY) {
            if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
            return true;
        }
        return false;
    }
};
struct Edge {
    int u, v, weight;

    bool operator<(const Edge &e) const {
        return weight < e.weight;
    }
};

int countMSTs(int n, vector<Edge> &edges) {
    sort(edges.begin(), edges.end());

    UnionFind uf(n);
    vector<Edge> mstEdges;
    int mstWeight = 0;
    for (const auto &e : edges) {
        if (uf.unionSets(e.u, e.v)) {
            mstEdges.push_back(e);
            mstWeight += e.weight;
        }
    }
    set<int> distinctWeights;
    for (const auto &e : mstEdges) {
        distinctWeights.insert(e.weight);
    }

    int mstCount = 1;
    for (int weight : distinctWeights) {
        vector<Edge> candidateEdges;
        for (const auto &e : edges) {
            if (e.weight == weight) {
                candidateEdges.push_back(e);
            }
        }

        int ways = 0;
        UnionFind tempUF(n);
        for (const auto &e : candidateEdges) {
            if (tempUF.unionSets(e.u, e.v)) {
                ways++;
            }
        }
        mstCount *= ways;
    }

    return mstCount;
}

int main() {
    int n, m;
    cout << "Enter number of vertices and edges: ";
    cin >> n >> m;

    vector<Edge> edges(m);
    cout << "Enter edges (u, v, weight):\n";
    for (int i = 0; i < m; ++i) {
        cin >> edges[i].u >> edges[i].v >> edges[i].weight;
    }

    int mstCount = countMSTs(n, edges);
    cout << "Number of MSTs: " << mstCount << endl;

    return 0;
}
